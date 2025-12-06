#version 300 es
precision mediump float;

in vec4 v_color;
in vec2 v_texCoord;
out vec4 fragColor;

uniform float u_timer;
uniform vec2 u_res;
uniform sampler2D u_skin;

void main() {
    fragColor = texture(u_skin, v_texCoord);
}