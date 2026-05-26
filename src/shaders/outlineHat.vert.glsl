attribute vec3 aSmoothNormal;
uniform float outlineWidth;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec3 worldNormal = normalize(mat3(modelMatrix) * aSmoothNormal);

  vec4 clipPos = projectionMatrix * viewMatrix * worldPos;
  vec4 clipNormal = projectionMatrix * viewMatrix * vec4(worldNormal, 0.0);
  clipPos.xy += normalize(clipNormal.xy) * outlineWidth * clipPos.w;

  gl_Position = clipPos;
}
