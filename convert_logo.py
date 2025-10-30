#!/usr/bin/env python3
from PIL import Image
import numpy as np

def convert_yellow_to_white(input_path, output_path):
    """Convierte todos los tonos amarillos/dorados a blanco en el logo"""
    # Abrir la imagen
    img = Image.open(input_path)

    # Convertir a RGBA si no lo está
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Convertir a array numpy para procesamiento
    data = np.array(img)

    # Separar los canales
    red, green, blue, alpha = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Detectar pixeles amarillos/dorados
    # El amarillo tiene alto red y green, bajo blue
    # Crear máscara para detectar amarillos (R > 150, G > 100, B < 150, y que no sea blanco puro)
    yellow_mask = (red > 150) & (green > 100) & (blue < 150) & ((red < 250) | (green < 250) | (blue < 250))

    # También detectar tonos dorados más oscuros
    dark_gold_mask = (red > 100) & (green > 80) & (blue < 100) & (red > blue) & (green > blue * 0.8)

    # Combinar máscaras
    conversion_mask = yellow_mask | dark_gold_mask

    # Convertir a blanco (255, 255, 255), preservando el canal alpha
    data[conversion_mask, 0] = 255  # Red
    data[conversion_mask, 1] = 255  # Green
    data[conversion_mask, 2] = 255  # Blue
    # Alpha se mantiene igual

    # Crear nueva imagen
    result = Image.fromarray(data, mode='RGBA')

    # Guardar
    result.save(output_path, 'PNG')
    print(f"Logo convertido exitosamente: {output_path}")

if __name__ == "__main__":
    # Lista de logos a convertir
    logos_to_convert = [
        ("/home/user/RentalsAI/client/public/images/rentals-ai-logo.png",
         "/home/user/RentalsAI/client/public/images/rentals-ai-logo-todo-blanco.png"),
        ("/home/user/RentalsAI/client/public/images/RENTALAS AI CIRCULAR SIN FONDO.png",
         "/home/user/RentalsAI/client/public/images/RENTALAS AI CIRCULAR SIN FONDO - TODO BLANCO.png"),
    ]

    for input_file, output_file in logos_to_convert:
        convert_yellow_to_white(input_file, output_file)
        print(f"✓ Conversión completada: {output_file}")
