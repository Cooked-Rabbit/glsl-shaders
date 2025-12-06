#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform vec2 u_res;
uniform sampler2D u_skin;

uniform float u_scaleMultiplier;
uniform vec4  u_clipBox;

void main() {
    // This shader is for only stamping when "High Quality Pen" was disabled.
    vec2 positionScratch = (gl_FragCoord.xy - u_res * 0.5 / u_scaleMultiplier) * vec2(1, -1);
    vec2 distance = 2.0 * abs(positionScratch - u_clipBox.xy);
    if(distance.x >= u_clipBox.z || distance.y >= u_clipBox.w) discard;
    fragColor = texture(u_skin, v_texCoord);
}

