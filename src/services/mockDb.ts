type Equipment = {
  id: string;
  name: string;
  code: string;
  location?: string;
  model?: string;
  vendor?: string;
  isActive: boolean;
};

type Task = {
  id: string;
  title: string;
  equipmentId: string;
  plannedDate: string; // YYYY-MM-DD
  dueDate?: string;    // YYYY-MM-DD
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

type DB = { equipment: Equipment[]; tasks: Task[] };

const LS_KEY = 'mock-db-v1';
const NET_DELAY_MS = 300; // затримка "мережі"

function load(): DB {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw) as DB;
  const seed: DB = {
    equipment: [
      { id: 'eq-1', name: 'Насос', code: 'EQ-001', location: 'Цех 1', isActive: true },
      { id: 'eq-2', name: 'Компресор', code: 'EQ-002', location: 'Цех 2', isActive: true },
    ],
    tasks: [
      {
        id: 't-1',
        title: 'ТО насоса',
        equipmentId: 'eq-1',
        plannedDate: new Date().toISOString().slice(0,10),
        priority: 'MEDIUM',
        status: 'PLANNED',
        description: 'Перевірити ущільнення',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };
  localStorage.setItem(LS_KEY, JSON.stringify(seed));
  return seed;
}

function save(db: DB) {
  localStorage.setItem(LS_KEY, JSON.stringify(db));
}

let db = load();

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2,8)}`;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function emptyResponse(status = 204) {
  return new Response(null, { status });
}

// Головний роутер mockFetch
export async function mockFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // штучна затримка
  await new Promise((r) => setTimeout(r, NET_DELAY_MS));

  const method = (options.method ?? 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body as string) : undefined;

  try {
    // EQUIPMENT
    if (url === '/equipment' && method === 'GET') {
      return jsonResponse(db.equipment);
    }
    if (url === '/equipment' && method === 'POST') {
      const item: Equipment = { id: id('eq'), isActive: true, ...body };
      db.equipment.push(item);
      save(db);
      return jsonResponse(item, 201);
    }
    if (url.startsWith('/equipment/') ) {
      const eqId = url.split('/')[2];
      const idx = db.equipment.findIndex(e => e.id === eqId);
      if (idx === -1) return new Response('Not found', { status: 404 });
      if (method === 'GET')  return jsonResponse(db.equipment[idx]);
      if (method === 'PATCH') {
        db.equipment[idx] = { ...db.equipment[idx], ...body };
        save(db);
        return jsonResponse(db.equipment[idx]);
      }
      if (method === 'DELETE') {
        db.equipment.splice(idx, 1);
        save(db);
        // також видалимо задачі, прив’язані до обладнання
        db.tasks = db.tasks.filter(t => t.equipmentId !== eqId);
        save(db);
        return emptyResponse(204);
      }
    }

    // TASKS
    if (url === '/tasks' && method === 'GET') {
      return jsonResponse(db.tasks);
    }
    if (url === '/tasks' && method === 'POST') {
      const now = new Date().toISOString();
      const item: Task = {
        id: id('t'),
        createdAt: now,
        updatedAt: now,
        ...body,
      };
      db.tasks.unshift(item);
      save(db);
      return jsonResponse(item, 201);
    }
    if (url.startsWith('/tasks/')) {
      const tId = url.split('/')[2];
      const idx = db.tasks.findIndex(t => t.id === tId);
      if (idx === -1) return new Response('Not found', { status: 404 });
      if (method === 'GET')  return jsonResponse(db.tasks[idx]);
      if (method === 'PATCH') {
        db.tasks[idx] = { ...db.tasks[idx], ...body, updatedAt: new Date().toISOString() };
        save(db);
        return jsonResponse(db.tasks[idx]);
      }
      if (method === 'DELETE') {
        db.tasks.splice(idx, 1);
        save(db);
        return emptyResponse(204);
      }
    }

    // AUTH (опційно, під демо)
    if (url === '/auth/login' && method === 'POST') {
      const token = 'mock-token';
      const user = { id: 'u-1', email: body?.email ?? 'demo@example.com', name: 'Demo User' };
      return jsonResponse({ token, user });
    }
    if (url === '/auth/session' && method === 'GET') {
      const token = 'mock-token';
      const user = { id: 'u-1', email: 'demo@example.com', name: 'Demo User' };
      return jsonResponse({ token, user });
    }

    // Невідомий маршрут
    return new Response(`Mock route not found: ${method} ${url}`, { status: 404 });
  } catch (e) {
    console.error('mockFetch error', e);
    return new Response('Mock server error', { status: 500 });
  }
}
