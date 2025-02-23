# Sistema Solar Interactivo 3D

Una visualización interactiva del Sistema Solar construida con React y Three.js, permitiendo explorar los planetas y sus órbitas en un entorno 3D inmersivo.

![Sistema Solar](preview.gif)

## 🚀 Características

- Modelo 3D completo del Sistema Solar
- Navegación interactiva entre planetas
- Texturas de alta calidad para todos los cuerpos celestes
- Animaciones suaves de cámara
- Sistema de iluminación realista
- Interfaz de usuario minimalista
- Pantalla de carga personalizada
- Órbitas y rotaciones planetarias realistas

## 🛠️ Tecnologías

- React
- Three.js
- React Three Fiber
- React Three Drei
- GSAP (Animaciones)
- Zustand (Estado global)

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/sistema-solar-3d.git
cd sistema-solar-3d
```

2.Instala las dependencias:

```bash
npm install
```

3.Inicia el proyecto:

```bash
npm start
```

## 🎮 Uso

- Utiliza los botones en la parte inferior para navegar entre planetas
- Click en el Sol para volver a la vista general
- Usa el mouse/trackpad para:
  - Click y arrastrar: Rotar la cámara
  - Scroll: Zoom in/out
  - Click derecho y arrastrar: Pan

## 🌟 Estructura del Proyecto

sistema-solar-3d/
├── src/
│ ├── components/
│ │ ├── Scene.jsx
│ │ ├── Planet.jsx
│ │ └── Loader.jsx
│ ├── store/
│ │ └── solarSystemStore.js
│ ├── data/
│ │ └── planets.js
│ ├── styles/
│ │ └── Loader.css
│ └── App.jsx
├── public/
│ └── textures/
│ └── planets/
└── package.json

## 🎨 Personalización

Puedes modificar los parámetros de los planetas en `src/data/planets.js`:

```javascript
{
name: 'Earth',
radius: 1,
distance: 20,
speed: 0.01,
texture: earthTexture,
moons: [...]
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📝 Licencia

[MIT](LICENSE)

## 🙏 Agradecimientos

- Texturas planetarias: NASA
- Three.js y la comunidad de React Three Fiber
- Contribuidores y testers

---

Desarrollado con ❤️ por The FullStack, We commit.
