varying vec2 vUv;

uniform vec3 color;
/** 화면 가로/세로 비. 비네트가 타원으로 늘어나지 않게 보정한다. */
uniform float aspect;
/** 0 이면 단색, 1 이면 그라데이션. 씬을 넘기는 사이 이 값도 같이 옮겨 간다. */
uniform float gradient;

/** 위쪽을 얼마나 밝힐지. 아래는 그 반대로 눌린다. */
const float TOP_GAIN = 1.55;
const float BOTTOM_GAIN = 0.45;

/** 가장 밝은 채널이 넘지 못할 선. 넘으면 흰색으로 뭉개진다. */
const float HEADROOM = 0.96;

void main() {
  // 밝게 만들 때 흰색을 섞지 않는다. `THREE.Color` 가 든 값은 선형이라
  // 흰색을 조금만 섞어도 채도가 왕창 날아간다. 크림슨(#AE0C36)에 흰색을
  // 38% 섞으면 #D2A6AA, 크림슨이 아니라 칙칙한 분홍이 된다.
  //
  // 대신 색을 통째로 곱한다. 채널 비율이 그대로라 색조가 남는다. 다만
  // 밝은 바탕은 금방 1.0 을 넘겨 흰색으로 뭉개지므로, 남은 여유만큼만
  // 올린다. 어두운 색은 TOP_GAIN 을 다 쓰고 밝은 색은 알아서 덜 쓴다.
  float peak = max(max(color.r, color.g), color.b);
  float gain = min(TOP_GAIN, HEADROOM / max(peak, 0.001));

  vec3 topColor = color * gain;
  vec3 bottomColor = color * BOTTOM_GAIN;

  float topBlend = pow(vUv.y, 3.5);
  float bottomBlend = pow(1.0 - vUv.y, 2.5);
  vec3 shaped = mix(mix(color, bottomColor, bottomBlend), topColor, topBlend);

  // 가운데 위쪽에서 은은하게 번지는 빛. 오브제가 놓이는 자리를 띄운다.
  vec2 toGlow = (vUv - vec2(0.5, 0.62)) * vec2(aspect, 1.0);
  float glow = 1.0 - smoothstep(0.0, 0.78, length(toGlow));
  shaped = mix(shaped, topColor, glow * 0.35);

  // 네 귀퉁이를 눌러 시선을 가운데로 모은다.
  vec2 toEdge = (vUv - 0.5) * vec2(aspect, 1.0);
  float vignette = smoothstep(0.42, 1.05, length(toEdge));
  shaped *= mix(1.0, 0.78, vignette);

  // 단색 씬은 위의 모양내기를 전부 건너뛴 것과 같아진다. 화면을 채우는
  // 그림을 쓰는 씬에서 그림의 평평한 바탕과 어긋나지 않게 하려는 것이다.
  vec3 result = mix(color, shaped, gradient);

  // 넓은 면을 덮는 완만한 그라데이션은 8비트에서 띠가 도드라진다.
  // 1/255 보다 작게 흔들어 띠를 잡음으로 흩는다. 단색일 때는 띠가 생길
  // 일이 없고, 오히려 평평한 면에 잡티로 보이므로 같이 꺼 둔다.
  float dither =
    fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  result += (dither - 0.5) / 255.0 * gradient;

  gl_FragColor = vec4(result, 1.0);

  // 이게 없으면 클리어 컬러로 칠할 때보다 어둡게 나온다. `THREE.Color` 는
  // 선형 값을 들고 있는데, ShaderMaterial 은 출력 색공간 변환을 저절로
  // 붙여 주지 않기 때문이다.
  #include <colorspace_fragment>
}
