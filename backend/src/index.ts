import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
const deals: any[] = [
  {
    id: '1',
    name: 'Emirates Fleet Expansion',
    airline: 'Emirates Airlines',
    stage: 'LOI Negotiation',
    valueUSD: 250000000,
    aircraftType: 'Boeing 777F',
    counterparty: 'Emirates Airlines',
    region: 'Middle East',
    owner: 'John Smith',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2026-01-15'),
    timeline: [
      { date: '2026-01-15', event: 'Deal Created', type: 'created' },
      { date: '2026-02-01', event: 'NDA Signed', type: 'document' },
      { date: '2026-03-10', event: 'Proposal Sent', type: 'proposal' },
    ],
    documents: [
      { id: 'd1', name: 'NDA.pdf', type: 'contract', uploaded: '2026-02-01' },
    ],
    loi: { id: 'loi1', version: 2, status: 'pending_signature' },
  },
  {
    id: '2',
    name: 'Singapore Airlines A350',
    airline: 'Singapore Airlines',
    stage: 'Due Diligence',
    valueUSD: 180000000,
    aircraftType: 'Airbus A350',
    counterparty: 'Singapore Airlines',
    region: 'Asia Pacific',
    owner: 'Sarah Johnson',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2026-02-20'),
    timeline: [
      { date: '2026-02-20', event: 'Deal Created', type: 'created' },
    ],
    documents: [],
    loi: null,
  },
  {
    id: '3',
    name: 'Lufthansa Cargo Opportunity',
    airline: 'Lufthansa Cargo',
    stage: 'Opportunity',
    valueUSD: 95000000,
    aircraftType: 'Boeing 787F',
    counterparty: 'Lufthansa Cargo',
    region: 'Europe',
    owner: 'Michael Chen',
    ownerAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date('2026-04-01'),
    timeline: [
      { date: '2026-04-01', event: 'Lead Generated', type: 'lead' },
    ],
    documents: [],
    loi: null,
  },
];

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Aircraft Deal Platform API' });
});

app.get('/api/deals', (req: Request, res: Response) => {
  res.json(deals);
});

app.get('/api/deals/:id', (req: Request, res: Response) => {
  const deal = deals.find(d => d.id === req.params.id);
  if (!deal) return res.status(404).json({ error: 'Not found' });
  res.json(deal);
});

app.post('/api/deals', (req: Request, res: Response) => {
  const newDeal = { id: uuidv4(), ...req.body, createdAt: new Date() };
  deals.push(newDeal);
  res.status(201).json(newDeal);
});

app.put('/api/deals/:id', (req: Request, res: Response) => {
  const deal = deals.find(d => d.id === req.params.id);
  if (!deal) return res.status(404).json({ error: 'Not found' });
  Object.assign(deal, req.body);
  res.json(deal);
});

app.delete('/api/deals/:id', (req: Request, res: Response) => {
  const index = deals.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  deals.splice(index, 1);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✈️  API running on http://localhost:${PORT}`);
});
