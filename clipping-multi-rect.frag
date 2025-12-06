#version 300 es
precision mediump float;

in vec4 v_color;
in vec2 v_texCoord;
out vec4 fragColor;

uniform float u_timer;
uniform vec2 u_res;
uniform sampler2D u_skin;

uniform float u_scaleMultiplier;
uniform int u_doStamping;
uniform int u_doHQPen;

uniform vec4 cl_value[10];
uniform float cl_rotation[10];
uniform int cl_mode[10];

vec2 positionGlToScr(vec2 position, bool doLowres) {
    return vec2((position - u_res * .5f / (doLowres ? u_scaleMultiplier : 1.f)) * vec2(1.f, u_doStamping == 0 ? 1.f : -1.f));
}

mat2 rotationMatrix(float rotation) {
    float c = cos(rotation);
    float s = sin(rotation);
    return mat2(c, s, -s, c);
}

void main() {
    bool doLowres = (u_doStamping == 1 && u_doHQPen == 0);
    vec2 positionScr = positionGlToScr(gl_FragCoord.xy, doLowres);
    float ufScale = (doLowres ? 1.f : u_scaleMultiplier);

    bool doExistsAny = false;
    bool doInsideOfAny = false;
    for(int i = 0; i < 10; i++) {
        if(cl_mode[i] != 0) {
            vec4 value = cl_value[i] * ufScale;
            vec2 distance = 2.f * abs(rotationMatrix(radians(cl_rotation[i])) * (positionScr - value.xy));
            bool doInsideOfThis = (distance.x <= value.z) && (distance.y <= value.w);
            if((cl_mode[i] == 2) && doInsideOfThis) {
                discard;
            }
            doExistsAny = (cl_mode[i] == 1) || doExistsAny;
            doInsideOfAny = (doInsideOfThis && (cl_mode[i] == 1)) || doInsideOfAny;
        }
    }
    if(doExistsAny && !doInsideOfAny) {
        discard;
    }

    fragColor = texture(u_skin, v_texCoord);
}
