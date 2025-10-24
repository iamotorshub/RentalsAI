
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ClaudeResponse {
  success: boolean;
  message: string;
  error?: string;
  usage?: any;
}

interface ChatRequest {
  message: string;
  context?: string;
}

interface PropertyAnalysisRequest {
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  currentIncome?: number;
}

interface IncomeOptimizationRequest {
  currentIncome: number;
  propertyType: string;
  location: string;
  amenities: string[];
}

export function useClaude() {
  const [isLoading, setIsLoading] = useState(false);

  const chatMutation = useMutation({
    mutationFn: async (data: ChatRequest): Promise<ClaudeResponse> => {
      const response = await apiRequest('POST', '/api/claude/chat', data);
      return response.json();
    },
  });

  const analyzePropertyMutation = useMutation({
    mutationFn: async (data: PropertyAnalysisRequest): Promise<ClaudeResponse> => {
      const response = await apiRequest('POST', '/api/claude/analyze-property', data);
      return response.json();
    },
  });

  const optimizeIncomeMutation = useMutation({
    mutationFn: async (data: IncomeOptimizationRequest): Promise<ClaudeResponse> => {
      const response = await apiRequest('POST', '/api/claude/optimize-income', data);
      return response.json();
    },
  });

  const sendMessage = async (message: string, context?: string) => {
    setIsLoading(true);
    try {
      const result = await chatMutation.mutateAsync({ message, context });
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeProperty = async (propertyData: PropertyAnalysisRequest) => {
    setIsLoading(true);
    try {
      const result = await analyzePropertyMutation.mutateAsync(propertyData);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const optimizeIncome = async (data: IncomeOptimizationRequest) => {
    setIsLoading(true);
    try {
      const result = await optimizeIncomeMutation.mutateAsync(data);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    analyzeProperty,
    optimizeIncome,
    isLoading: isLoading || chatMutation.isPending || analyzePropertyMutation.isPending || optimizeIncomeMutation.isPending,
    error: chatMutation.error || analyzePropertyMutation.error || optimizeIncomeMutation.error,
  };
}
