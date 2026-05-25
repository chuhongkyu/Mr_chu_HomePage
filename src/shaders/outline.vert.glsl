uniform float outlineWidth;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
  worldPos.xyz += worldNormal * outlineWidth;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
