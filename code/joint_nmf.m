function H=kbnmf_sim(X,Y,W,V,alpha,sparse_c,iterations)


H=ones(size(X,1),size(W,1));
%SS=S';
WW = W';
VV = V';
OX=ones(size(X));
OY=ones(size(Y));

OXWW = OX*WW;
OYVV = OY*VV;

for i=1:iterations
  AX = H * W;
  AY = H * V;

  X_P = (1-alpha)*(X./AX)*WW;
  Y_P = alpha*(Y./AY)*VV;
  D_P = (1-alpha)*OXWW + alpha*OYVV + sparse_c;
  
  H = H.*(X_P + Y_P)./(D_P);
end
