# Example Microservices App Running on Kind

This is an example application that includes:
- .NET Core 3.1 API application for a project tasks management service
- React.js front end running on Node.js to interact with our API
- Kind Kubernetes cluster configurations with an internal ingress controller
- Helm Charts to deply the Kind Ingress Nginx Controller, the Web API, and the front end application

## Prerequisites
- Docker CE for Windows v19.0.0 or later running Linux Containers
- Kubectl v1.18.0 or later
- Chocolatey v0.10.0 or later

## Kind Overview
Kind solves a problem that all Kubernetes developers eventually face \-\- local resource exhaustion.
The typical convention is to use Minikube to develop on a local Kubernetes cluster, but Minikube requires two VMs to run the control plane and worker node. In addition Docker for Windows requires another VM to run Linux containers. Let's just say that our laptop is already tired! Especially with IDEs, debuggers, package managers, and everything else that envelopes resources quickly. Or, maybe it's just Chrome with the 15 Stack Overflow and Reddit pages running? :P

Kind takes a different approach by setting up the control plane and worker node as containers in Docker utilizing the VM that's already built for Linux containers on Windows. This means less resource intensive development workloads, and ephemeral clusters that can be leveraged when needed.

## Deploying the Kubernetes Cluster Using Kind
First, we'll start off by installing **Kind**. We'll be working on a Windows machine so we'll be using **Chocolatey** the Windows package manager.
Use the following command to instlal **Kind** on your machine:

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

Navigate to the **kind** directory from the cloned repo and run the following command to bring up the cluster:
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

This will bootstrap a Kubernetes cluster using Docker containers as the control plane and worker nodes and will then merge the admin kubeconfig to your user directory. Additionally, the configuration that we passed in also supports ingress-nginx so that we can expose services within the cluster just like we would in a normal Kubernetes cluster in AKS, EKS, or GKE \-\- pretty cool!

Let's verify cluster access by running:
```sh
kubectl get nodes
```

We should see the following output if we followed this guide exactly:
```txt
NAME                 STATUS   ROLES    AGE   VERSION
kind-control-plane   Ready    master   41m   v1.18.2
```

If the **STATUS** shows not ready you can watch the nodes with the following command until the **STATUS** is **Ready**:
```sh
kubectl get nodes -w
```

Next, we'll install Helm and then install the necessary charts to get the ingress-nginx controller deployed along with the API components.

## Setup Helm and Deploy the Application Components
Helm is **THE** package manager for Kubernetes...OK not really, but it's definitely the most popular for Kubernetes applications. It allows you to bundle Kubernetes manifests into a single package making them easier to deploy. Helm also supports templating using a Go based template syntax in addition to complete application lifecycle management. Everything you can do with Helm is out of the scope of this readme, but we'll introduce you to some of its concepts along the way.

Let's first install Helm via Chocolatey:
```powershell
choco install kubernetes-helm -y
```

We can verify the installation by running:
```sh
helm version
```

Navigate to the **artifacts** directory from the repo we cloned ealier, and examine it. We'll start off by deploying the ingress-nginx controller artifact which is contained within the *kind-ingress-nginx-0.1.0.tgz* archive. We'll also use flags to have Helm create the namespace:
```sh
helm install kind-ingress-nginx ./kind-ingress-nginx-0.1.0.tgz --namespace=ingress-nginx --create-namespace
```

Helm will give the following output once it has finished deploying all of the resources for the ingress-nginx controller to your Kind cluster:
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
  http://localhost/api/ProjectTasksItems
```

We'll need to watch the ingress definition until ingress-nginx attaches an external address to the service:
```
kubectl get ingress -n web-api -w
```

It will be ready when we see **localhost** under **ADDRESS**:
```
NAME              CLASS    HOSTS       ADDRESS     PORTS   AGE
web-api-service   <none>   localhost   localhost   80      12m
```

Now we should be able to navigate to http://localhost/api/ProjectTasksItems and return the following:
```txt
[]
```

This is the expected output as the .NET Core Web API uses an in-memory database, so there is no data to be returned! We have just deployed two services to our cluster using Helm, and exposed our API using ingress-nginx so that our front end can interact with it once deployed. Let's do that now so we can actually use the API service.

## Deploy the React Front End
Everything for the React front end has already been packaged for Helm and can be found in the **artifacts** directory. We'll need to navigate to the **artifacts** directory and run the following Helm command to deploy the service:
```
helm install react-frontend .\react-frontend-0.1.0.tgz --namespace=react-frontend --create-namespace
```
Once complete Helm should return the following:
```
NAMESPACE: react-frontend
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  http://localhost/
```

This Helm chart deploys an ingress definition for the React application so we'll need to watch the ingress definition until our ingress-nginx controller binds an address to it before it can become accesible. Run the following command until **ADDRESS** displays localhost: 
```
kubectl get ingress -n react-frontend -w
```

Now we can navigate to http://localhost and see our Project Tasks menu. Create a new task by selecting the **New Task** button, fill out the fields, and then you should see the new task card show up. Everything is now up and running successfully on our Kind cluster! We have a React frontend application service and a .NET Core API service with ingress defintions that control traffic in to the cluster. 

This application is definitely not production ready, and there's vast improvements that can be made, especially since the API is allowing CORS requests from any domain, on any method, not secure by any means, but I hope this gives you an idea of what is possible using Kind and how it can be leveraged to speed up development time when creating microservices with Kubernetes.

I hope this has been helpful for you and if you have any questions feel free to reach out!
