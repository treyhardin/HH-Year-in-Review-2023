uniform vec3 color;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vTime;

void main() {
    
    // vec4 textureColor = texture2D(uTexture, vUv);

    // gl_FragColor = texture2D(uTexture, vUv);
    // gl_FragColor = cnoise(vUv, 1.0);
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
