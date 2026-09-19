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

  // NDC 는 x/y 가 똑같이 -1..1 이지만 대응하는 픽셀 수가 다르다.
  // 보정 없이 밀면 가로로 넓은 화면에서 외곽선이 세로만 두꺼워진다.
  // 투영 행렬의 두 스케일 비가 곧 화면 비율이다(원근·직교 모두).
  float aspect = projectionMatrix[1][1] / projectionMatrix[0][0];

  vec2 n = vec2(clipNormal.x * aspect, clipNormal.y);
  float len = length(n);

  // 법선이 화면을 정면으로 보면 xy 가 0 에 가까워진다.
  // 그대로 normalize 하면 값이 폭주해 외곽선이 뾰족하게 튀거나 구멍이 난다.
  vec2 dir = len > 1e-4 ? n / len : vec2(0.0);

  clipPos.x += (dir.x / aspect) * outlineWidth * clipPos.w;
  clipPos.y += dir.y * outlineWidth * clipPos.w;

  gl_Position = clipPos;
}
