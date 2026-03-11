# DevOps E-Commerce Project

A complete DevOps pipeline for an e-commerce application using modern containerization and orchestration technologies.

## Project Structure

```
ecommerce-devops-project/
├── frontend/          # Next.js React application
├── backend/           # Node.js Express API
├── docker/            # Docker configurations
├── terraform/         # AWS infrastructure as code
├── k8s/              # Kubernetes deployments
├── jenkins/          # CI/CD pipeline
└── argocd/           # GitOps deployment
```

## Technologies Used

- **Frontend**: Next.js, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Cache**: Redis
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Infrastructure**: Terraform (AWS EKS)
- **CI/CD**: Jenkins
- **GitOps**: ArgoCD

## Quick Start

### Run Locally

**Backend:**
```bash
cd backend
node server.js
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

### Check Pod Status

```bash
kubectl get pods
```

## Services

- Frontend: LoadBalancer on port 80
- Backend: ClusterIP on port 5000
- MongoDB: ClusterIP on port 27017
- Redis: ClusterIP on port 6379

## Infrastructure

The project includes Terraform configurations for:
- AWS VPC setup
- EKS cluster deployment
- Networking and security groups

## CI/CD Pipeline

Jenkins pipeline automates:
- Code checkout
- Docker image building
- Kubernetes deployment

## GitOps

ArgoCD manages continuous deployment from Git repository to Kubernetes cluster.