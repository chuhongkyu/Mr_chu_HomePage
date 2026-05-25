varying vec2 vUv;
uniform vec3 color;

void main() {
  float topBlend    = pow(vUv.y, 3.5);
  float bottomBlend = pow(1.0 - vUv.y, 2.5);
  vec3 topColor    = mix(color, vec3(1.0), 0.38);
  vec3 bottomColor = color * 0.62;
  vec3 result = mix(mix(color, bottomColor, bottomBlend), topColor, topBlend);
  gl_FragColor = vec4(result, 1.0);
}
