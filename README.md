# Kube-sidecar-hello


## Build both images
podman build -t sidecar-hello:local -f Dockerfile.sidecar .
podman build -t main-hello:local -f Dockerfile.main .

podman save sidecar-hello:local -o sidecar-hello.tar
podman save main-hello:local -o main-hello.tar

minikube image load sidecar-hello.tar
minikube image load main-hello.tar

### verify both are visible
minikube image ls | grep hello

## Deploy and watch both containers:
kubectl apply -f deployment.yaml

### Wait for running
kubectl get pods -w

### Once running — check sidecar logs
kubectl logs -l app=sidecar-hello -c sidecar

### Check main app logs
kubectl logs -l app=sidecar-hello -c main-app
```
You should see:

### sidecar logs
Sidecar wrote: Hello from sidecar — update #1 at 2026-03-26T10:00:00.000Z
Sidecar wrote: Hello from sidecar — update #2 at 2026-03-26T10:00:05.000Z

### main-app logs
Main app: waiting for sidecar to write...
Main app read: Hello from sidecar — update #1 at 2026-03-26T10:00:00.000Z
Main app read: Hello from sidecar — update #2 at 2026-03-26T10:00:05.000Z
```