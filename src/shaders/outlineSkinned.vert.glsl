#include <common>
#include <skinning_pars_vertex>
uniform float outlineWidth;

void main() {
  vec3 objectNormal = normal;
  vec3 transformed = position;

  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <skinning_vertex>

  vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
  vec3 worldNormal = normalize(mat3(modelMatrix) * objectNormal);

  // clip-space 팽창: 거리·각도에 상관없이 균일한 화면 두께
  vec4 clipPos = projectionMatrix * viewMatrix * worldPos;
  vec4 clipNormal = projectionMatrix * viewMatrix * vec4(worldNormal, 0.0);
  clipPos.xy += normalize(clipNormal.xy) * outlineWidth * clipPos.w;

  gl_Position = clipPos;
}
