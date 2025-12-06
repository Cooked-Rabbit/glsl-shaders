#version 300 es

in vec4 a_position;
in vec4 a_color;
in vec2 a_texCoord;

out vec4 v_color;
out vec2 v_texCoord;

uniform float u_timer;
uniform mat4  u_transform;
uniform vec2  u_res;

vec4 rotation(vec4 invec4) {
    return vec4((invec4.y)*u_transform[1][0]+(invec4.x)*u_transform[1][1],(invec4.y)*u_transform[1][1]-(invec4.x)*u_transform[1][0],invec4.zw);
}

void main() {
    gl_Position = (rotation(a_position)+vec4(u_transform[0][2],u_transform[0][3],0,0))*vec4(a_position.w*u_transform[0][0],a_position.w*-u_transform[0][1],1,1)-vec4(0,0,1,0);
        v_color = a_color;
     v_texCoord = a_texCoord;


}
