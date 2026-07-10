# CareerBridge AI - Self-Hosted Load Balanced Deployment

This folder contains the configuration templates required to run the Next.js application behind an Nginx load balancer.

---

## 1. Prerequisites
- Docker & Docker Compose installed on the host machine.
- Set up your `.env` file in the root containing your Supabase secrets:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

---

## 2. Architecture Overview
```
                          Internet / Clients
                                  │
                          nginx-loadbalancer (Port 80)
                         /                          \
             nextjs-node-1 (Port 3000)      nextjs-node-2 (Port 3000)
                         \                          /
                          \                        /
                           Supabase PostgreSQL / Auth
```

---

## 3. Quickstart Guide
1. From the root directory, start the container cluster:
   ```bash
   docker compose -f deployment/self-hosted/docker-compose.yml up --build -d
   ```
2. The application will be accessible at:
   `http://localhost/`
3. Health check monitoring is available at:
   `http://localhost/api/health`
4. The load-balancer distributes traffic dynamically between the two running Next.js nodes using the `least_conn` algorithm.
