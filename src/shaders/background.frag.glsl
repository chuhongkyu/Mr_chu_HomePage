varying vec2 vUv;

uniform vec3 color;
uniform float aspect;
/** 0 = 단색, 1 = 그라데이션. */
uniform float gradient;

const float TOP_GAIN = 1.55;
const float BOTTOM_GAIN = 0.45;

/** 가장 밝은 채널이 넘지 못할 선. 넘으면 흰색으로 뭉개진다. */
const float HEADROOM = 0.96;

void main() {
  // 흰색을 섞어 밝히지 마라. `THREE.Color` 값은 선형이라 채도가 날아간다.
  // 크림슨(#AE0C36) + 흰색 38% = #D2A6AA, 크림슨이 아니라 칙칙한 분홍이다.
  // 곱셈은 채널 비율을 지킨다. 대신 밝은 바탕이 1.0 을 넘지 않게 여유만큼만.
  float peak = max(max(color.r, color.g), color.b);
  float gain = min(TOP_GAIN, HEADROOM / max(peak, 0.001));

  vec3 topColor = color * gain;
  vec3 bottomColor = color * BOTTOM_GAIN;

  float topBlend = pow(vUv.y, 3.5);
  float bottomBlend = pow(1.0 - vUv.y, 2.5);
  vec3 shaped = mix(mix(color, bottomColor, bottomBlend), topColor, topBlend);

  vec2 toGlow = (vUv - vec2(0.5, 0.62)) * vec2(aspect, 1.0);
  float glow = 1.0 - smoothstep(0.0, 0.78, length(toGlow));
  shaped = mix(shaped, topColor, glow * 0.35);

  vec2 toEdge = (vUv - 0.5) * vec2(aspect, 1.0);
  float vignette = smoothstep(0.42, 1.05, length(toEdge));
  shaped *= mix(1.0, 0.78, vignette);

  // 화면을 채우는 그림을 쓰는 씬은 단색이라야 한다. 그라데이션을 깔면
  // 그림의 평평한 바탕과 어긋나 그림 가장자리가 사각형으로 드러난다.
  vec3 result = mix(color, shaped, gradient);

  // 넓은 그라데이션은 8비트에서 띠가 진다. 1/255 보다 작게 흔들어 흩는다.
  float dither =
    fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  result += (dither - 0.5) / 255.0 * gradient;

  gl_FragColor = vec4(result, 1.0);

  // 없으면 클리어 컬러보다 어둡게 나온다. ShaderMaterial 은 출력 색공간
  // 변환을 저절로 붙여 주지 않는다.
  #include <colorspace_fragment>
}
