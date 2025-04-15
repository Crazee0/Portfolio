// 3D Car Model Viewer
let scene, camera, renderer, carModel;
let modelLoaded = false;

function initCarModel() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Create camera with adjusted position
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // Moved camera back to make the model appear smaller

    // Create renderer with higher quality
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio); // Sharper rendering
    
    // Add renderer to DOM
    const container = document.getElementById('car-model-container');
    if (container) {
        container.appendChild(renderer.domElement);
    } else {
        console.error('Container element not found');
        return;
    }

    // Improved lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Brighter ambient light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Brighter directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add a second directional light from another angle for better highlighting
    const directionalLight2 = new THREE.DirectionalLight(0x7928ca, 0.8);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    // Create a default car model right away
    createDefaultModel();

    // Try to load a better model from online source
    loadOnlineModel();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation loop
    animate();
}

// Create a simple car model using basic geometries
function createDefaultModel() {
    // Create a simple car-like shape using basic geometries
    const carBody = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 3);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.3,
        metalness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    carBody.add(body);
    
    // Top part (cabin)
    const cabinGeometry = new THREE.BoxGeometry(1.2, 0.4, 1.5);
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
    cabin.position.y = 0.45;
    cabin.position.z = -0.2;
    carBody.add(cabin);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.4,
        metalness: 0.5
    });
    
    // Front left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.position.set(-0.8, -0.3, 0.8);
    carBody.add(wheelFL);
    
    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(0.8, -0.3, 0.8);
    carBody.add(wheelFR);
    
    // Rear left wheel
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRL.rotation.z = Math.PI / 2;
    wheelRL.position.set(-0.8, -0.3, -0.8);
    carBody.add(wheelRL);
    
    // Rear right wheel
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRR.rotation.z = Math.PI / 2;
    wheelRR.position.set(0.8, -0.3, -0.8);
    carBody.add(wheelRR);
    
    // Add the default model to the scene
    carBody.scale.set(0.8, 0.8, 0.8);
    carBody.rotation.y = Math.PI / 6;
    scene.add(carBody);
    carModel = carBody;
    modelLoaded = true;
    
    return carBody;
}

// Function to load an online model (Ferrari-like car from Sketchfab)
function loadOnlineModel() {
    // Check if GLTFLoader is available
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.error('GLTFLoader is not defined. Check if the script is loaded correctly.');
        return;
    }
    
    const loader = new THREE.GLTFLoader();
    
    // Use a free car model from a CDN
    const modelUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/ferrari.glb';
    
    console.log('Attempting to load online model from: ' + modelUrl);
    
    loader.load(
        modelUrl,
        function (gltf) {
            // Success - remove default model if it exists
            if (carModel && scene.getObjectById(carModel.id)) {
                scene.remove(carModel);
            }
            
            carModel = gltf.scene;
            
            // Set model color to black
            carModel.traverse(function(child) {
                if (child.isMesh) {
                    // Create a new black material
                    const blackMaterial = new THREE.MeshStandardMaterial({
                        color: 0x111111, // Very dark gray (almost black)
                        roughness: 0.3,  // Slightly glossy
                        metalness: 0.8,  // Metallic look
                        emissive: 0x000000,
                        flatShading: false
                    });
                    
                    // Apply the material to the mesh
                    child.material = blackMaterial;
                }
            });
            
            // Center the model
            const box = new THREE.Box3().setFromObject(carModel);
            const center = box.getCenter(new THREE.Vector3());
            carModel.position.x = -center.x;
            carModel.position.y = -center.y - 0.2; // Slight adjustment to position vertically
            carModel.position.z = -center.z;
            
            // Scale the model appropriately
            carModel.scale.set(0.8, 0.8, 0.8);
            
            // Add model to scene
            scene.add(carModel);
            modelLoaded = true;
            
            // Initial rotation to show the model from a better angle
            carModel.rotation.y = Math.PI / 6;
            
            // Log success
            console.log('Online car model loaded successfully');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading online model', error);
            console.log('Using default geometric car model instead');
            // We already have the default model created, so nothing more to do here
        }
    );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the car model if it's loaded
    if (modelLoaded && carModel) {
        carModel.rotation.y += 0.005; // Slower, more subtle rotation
    }
    
    renderer.render(scene, camera);
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded with more detailed error reporting
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Check if the script is included correctly.');
        return;
    }
    
    // Check for required Three.js components
    const requiredComponents = ['Scene', 'PerspectiveCamera', 'WebGLRenderer', 'GLTFLoader'];
    let missingComponents = [];
    
    requiredComponents.forEach(component => {
        if (typeof THREE[component] === 'undefined') {
            missingComponents.push(component);
        }
    });
    
    if (missingComponents.length > 0) {
        console.error('Missing required Three.js components: ' + missingComponents.join(', '));
        return;
    }
    
    initCarModel();
}); 