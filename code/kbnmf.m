function A=kbnmf(X,S,sparse_c,iterations)

%KBNMF minimizes the Kullback-Leibler divergence between observations
%X and the model A*S, plus the sparsity constraint 
%sparse_c * sum(A(:)).
%
%usage: A=kbnmf(X,S,sparse_c,iterations)
%
%input:
%
%X           observation matrix (num_of_frames x frequencies)
%S           exemplar basis matrix (num_of_exemplars x frequencies)
%sparse_c    sparseness coefficient
%iterations  number of iterations
%
%output:
%
%A          activation matrix (num_of_frames x num_of_exemplars)


A=ones(size(X,1),size(S,1));
SS=S';
O=ones(size(X));

OSS=O*SS;

for i=1:iterations
  V=A*S;

  A=A.*((X./V)*SS)./(OSS+sparse_c);
end

