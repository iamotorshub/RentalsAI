#!/usr/bin/env python3
"""
Script para remover el recuadro blanco del logo y dejar solo el diseño circular
"""

from PIL import Image, ImageDraw
import os

def remove_box_make_circular(input_path, output_path):
    """
    Remueve el recuadro blanco/rectangular y crea una imagen circular con transparencia
    """
    # Abrir la imagen
    img = Image.open(input_path)

    # Convertir a RGBA si no lo está ya
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Obtener datos de la imagen
    width, height = img.size

    # Crear una nueva imagen con transparencia
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))

    # Crear una máscara circular
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)

    # Encontrar el centro y radio del círculo
    # El logo circular debería estar en el centro
    center_x = width // 2
    center_y = height // 2

    # El radio será aproximadamente el 90% del lado más pequeño / 2
    # Esto asegura que capturamos todo el círculo
    radius = min(width, height) * 0.45

    # Dibujar círculo en la máscara
    draw.ellipse(
        (center_x - radius, center_y - radius,
         center_x + radius, center_y + radius),
        fill=255
    )

    # Aplicar la máscara
    result.paste(img, (0, 0), mask=mask)

    # Recortar al círculo (quitar espacio extra)
    # Encontrar el bounding box del contenido no transparente
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    # Guardar el resultado
    result.save(output_path, 'PNG')
    print(f"✓ Procesado: {output_path}")

def main():
    # Directorio de imágenes
    img_dir = "/home/user/RentalsAI/client/public/images"

    # Archivos a procesar
    files_to_process = [
        ("rentals-ai-logo.png", "rentals-ai-logo.png"),
        ("rentals-ai-logo-blanco1.png", "rentals-ai-logo-blanco1.png"),
        ("rentals-ai-logo-todo-blanco.png", "rentals-ai-logo-todo-blanco.png"),
        ("logo-footer.png", "logo-footer.png"),
    ]

    print("Removiendo recuadros blancos de los logos...")
    print("=" * 50)

    for input_file, output_file in files_to_process:
        input_path = os.path.join(img_dir, input_file)
        output_path = os.path.join(img_dir, output_file)

        if os.path.exists(input_path):
            remove_box_make_circular(input_path, output_path)
        else:
            print(f"⚠ Archivo no encontrado: {input_path}")

    print("=" * 50)
    print("¡Proceso completado!")

if __name__ == "__main__":
    main()
