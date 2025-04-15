// Car Model Viewer - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
    // Check WebGL support
    if (!window.WebGLRenderingContext) {
        displayError('Your browser does not support WebGL');
        return;
    }

    const container = document.querySelector('#car-model-container');
    if (!container) return;

    // Performance settings
    const FPS_LIMIT = 15;
    const FRAME_TIME = 1000 / FPS_LIMIT;
    let lastFrameTime = 0;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Simple camera setup
    const camera = new THREE.PerspectiveCamera(
        45, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        100
    );
    camera.position.set(0, 0, 5);

    // Low quality renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'low-power',
        precision: 'lowp'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(1); // Force 1:1 pixel ratio for performance
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Add minimal lighting
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = false;
    scene.add(directionalLight);

    // Create a simple car model using basic geometries
    function createSimpleCar() {
        const car = new THREE.Group();
        
        // Car body - simple box
        const bodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 3);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x4285f4 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        car.add(body);

        // Car roof - smaller box
        const roofGeometry = new THREE.BoxGeometry(1.2, 0.4, 1.5);
        const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
        roof.position.y = 0.9;
        roof.position.z = 0.2;
        car.add(roof);

        // Car wheels - simple cylinders
        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
        const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        
        // Front left wheel
        const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1.rotation.z = Math.PI / 2;
        wheel1.position.set(-0.8, 0.3, 1);
        car.add(wheel1);
        
        // Front right wheel
        const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel2.rotation.z = Math.PI / 2;
        wheel2.position.set(0.8, 0.3, 1);
        car.add(wheel2);
        
        // Rear left wheel
        const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel3.rotation.z = Math.PI / 2;
        wheel3.position.set(-0.8, 0.3, -1);
        car.add(wheel3);
        
        // Rear right wheel
        const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel4.rotation.z = Math.PI / 2;
        wheel4.position.set(0.8, 0.3, -1);
        car.add(wheel4);
        
        // Scale and center the model
        car.scale.set(1, 1, 1);
        
        return car;
    }

    // Load car model with fallbacks
    function loadCarModel() {
        // Try loading GLB model first
        const loader = new THREE.GLTFLoader();
        loader.load(
            'models/car.glb',
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(2, 2, 2);
                model.position.y = -1;
                scene.add(model);
            },
            undefined,
            (error) => {
                console.log('GLB model failed to load:', error);
                
                // Fallback to OBJ model
                const objLoader = new THREE.OBJLoader();
                objLoader.load(
                    'models/car.obj',
                    (obj) => {
                        obj.scale.set(0.02, 0.02, 0.02);
                        obj.position.y = -1;
                        scene.add(obj);
                    },
                    undefined,
                    (error) => {
                        console.log('OBJ model failed to load:', error);
                        // Final fallback: create simple car
                        const simpleCar = createSimpleCar();
                        scene.add(simpleCar);
                    }
                );
            }
        );
    }

    // Load the car model
    loadCarModel();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });

    // Animation loop with FPS limiting
    function animate(currentTime) {
        requestAnimationFrame(animate);
        
        // Limit FPS
        if (!lastFrameTime) lastFrameTime = currentTime;
        const elapsed = currentTime - lastFrameTime;
        
        if (elapsed < FRAME_TIME) return;
        
        lastFrameTime = currentTime - (elapsed % FRAME_TIME);
        
        // Slowly rotate the scene
        scene.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();

    // Display error message
    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.padding = '20px';
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
    }
}); 