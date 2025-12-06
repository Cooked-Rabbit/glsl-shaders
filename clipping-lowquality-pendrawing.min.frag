#version 300 es
precision mediump float;in vec2 v_texCoord;out vec4 fragColor;uniform vec2 u_res;uniform sampler2D u_skin;uniform float u_scaleMultiplier;uniform vec4 u_clipBox;void main(){vec2 p=(gl_FragCoord.xy-u_res*.5/u_scaleMultiplier)*vec2(1, -1),d=2.*abs(p-u_clipBox.xy);if(d.x>=u_clipBox.z||d.y>=u_clipBox.w)discard;fragColor=texture(u_skin,v_texCoord);}
