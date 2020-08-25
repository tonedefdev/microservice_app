# Example Microservices App Running on Kind

This is an example application that includes:
- A .NET Core 3.1 API application for a project tasks management service
- A Bootstrap 4 / JQuery front end running on Nginx
- Kind Kubernetes cluster configurations with an internal ingress controller
- Helm Charts to deply the Kind Ingress Nginx Controller, the Web API, and the front end application

## Prerequisites
- Docker CE for Windows v19.0.0 or later running Linux Containers
- Kubectl v1.18.0 or later

## Kind Overview
Kind solves a problem that all Kubernetes developers eventually face \-\- local resource exhaustion.
The typical convention was to use Minikube to develop inside of Kubernetes, but Minikube requires two VMs to run the control plane and worker node which can tax a laptop real quick.
Kind takes a different approach by setting up the control plane and worker node as containers in Docker utilizing the VM that's already built for Linux containers on Windows.
This means less resource intensive development workloads, and ephermeral clusters that can be leveraged when needed.

## Deploying the Kubernetes Cluster Using Kind
First, you must install **Kind**. We'll be showcasing a Windows machine so we'll be using Chocolatey the Windows Package manager.
Use the following command to instlal **Kind** which should also install **Go** as well:

```powershell
choco install kind -y
```

You can verify it was successfully installed by running:
```sh
kind version
```

This will output:
```sh
kind v0.8.1 go1.14.2 windows/amd64
```

Clone this repository to a directory of your choice:
```sh
git clone git@github.com:tonedefdev/microservice_app.git
```

Navigate to **kind** directory from the cloned repo and run the following command to bring up the cluster:
```sh
kind create cluster --config=./kind-ingress-nginx-config.yaml
```

You'll see the following once it has completed:
```txt
Creating cluster "kind" ...
 ←[32m✓←[0m Ensuring node image (kindest/node:v1.18.2) 🖼
 ←[32m✓←[0m Preparing nodes 📦
 ←[32m✓←[0m Writing configuration 📜
 ←[32m✓←[0m Starting control-plane 🕹️
 ←[32m✓←[0m Installing CNI 🔌
 ←[32m✓←[0m Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:
kubectl cluster-info --context kind-kind

Thanks for using kind! 😊
```

This will bootstrap a Kubernetes cluster using Docker containers and will then merge the admin kubeconfig to your user directory. Additionally, the configuration that we passed in also supports ingress-nginx so that we can expose services within the cluster just like we would in a normal Kubernetes cluster in AKS, EKS, or GKE \-\- pretty cool!

Let's verify cluster access by running:
```sh
kubectl get nodes
```

We should see the following output if we followed this guide exactly:
```txt
NAME                 STATUS   ROLES    AGE   VERSION
kind-control-plane   Ready    master   41m   v1.18.2
```

Next, we'll install Helm and then install the necessary charts to get the ingress-nginx controller deployed along with the application components.

## Setup Helm and Deploy the Application Components
Helm is THE package manager for Kubernetes applications. It allows you to bundle Kubernetes manifests into a single package to make it eaiser to deploy them to Kubernetes clusters. Helm also supports templating using a Go based template syntax in addition to complete application lifecycle management. Everything you can do with Helm is out of the scope of this readme, but we'll introduce you to some use cases along the way.

Let's first install Helm via Chocolatey:
```powershell
choco install kubernetes-helm -y
```

We can verify the installation by running:
```sh
helm version
```

Navigate to the **artifacts** directory from the repo we cloned ealier, and examine it. We'll start off by deploying the ingress-nginx controller which is contained within the *kind-ingress-nginx-0.1.0.tgz* archive. We'll also use flags to create the namespace using Helm:
```sh
helm install kind-ingress-nginx ./kind-ingress-nginx-0.1.0.tgz --namespace=ingress-nginx --create-namespace
```

Once finished deploying all of the resources for the ingress-nginx controller to your Kind cluster Helm will give the following output:
```txt
NAME: kind-ingress-nginx
LAST DEPLOYED: Mon Aug 24 21:23:11 2020
NAMESPACE: ingress-nginx
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace ingress-nginx -l "app.kubernetes.io/name=kind-ingress-nginx,app.kubernetes.io/instance=kind-ingress-nginx" -o jsonpath="{.items[0].metadata.name}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace ingress-nginx port-forward $POD_NAME 8080:80
```

Now we'll deploy the web API for the application:
```sh
helm install web-api ./web-api-0.1.0.tgz --namespace=web-api --create-namespace
```

Once finished you should see:
```txt
NAME: web-api
LAST DEPLOYED: Mon Aug 24 21:24:26 2020
NAMESPACE: web-api
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  http:///api/ProjectTasksItems
```

>You might have noticed that the URL Helm produces in the *NOTES:* is malformed. This is due to the fact that when we deploy the application we also deploy the ingress definition for the application in the **web-api** namespace. The ingress defintion has an annotation that the ingress-nginx controller will look for. Once the ingress-nginx controller finds ingress' with this annotation it will associate itself with the the defintion and supply the defined services an external address. This process takes a minute or so after deployment, and then the web-api will be available via http://localhost/api/ProjectTasksItems

You should be able to navigate to http://localhost/api/ProjectTasksItems and return the following:
```txt
[]
```

This is the expected output as the container uses an in memory database, so there is nothing found...yet! Congratulations, as we have just deployed two services to our cluster using Helm, and exposed our API using ingress-nginx so that our front end can interact with it.