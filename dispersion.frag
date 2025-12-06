#version 300 es
precision mediump float;

in vec4 v_color;
in vec2 v_texCoord;
out vec4 fragColor;

uniform float u_timer;
uniform vec2 u_res;
uniform sampler2D u_skin;

uniform vec3 direction;
uniform vec3 amplitude;
uniform float scale_multiplier;

void main() {
    vec2 sc = scale_multiplier / u_res;
    vec3 d = radians(270. - direction);
    vec3 c = cos(d);
    vec3 s = sin(d);
    vec4 r = texture(u_skin, v_texCoord + sc * amplitude.r * vec2(c.r, s.r));
    vec4 g = texture(u_skin, v_texCoord + sc * amplitude.g * vec2(c.g, s.g));
    vec4 b = texture(u_skin, v_texCoord + sc * amplitude.b * vec2(c.b, s.b));
    vec4 a = texture(u_skin, v_texCoord);
    fragColor = vec4(r.r, g.g, b.b, a.a);
}