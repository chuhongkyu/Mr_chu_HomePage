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
  worldPos.xyz += worldNormal * outlineWidth;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
