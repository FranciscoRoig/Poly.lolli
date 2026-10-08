import {
  AuditLogEntry,
  Booking,
  ChangeRequest,
  Customer,
  EventDetails,
  LowRiskPreferences,
  PaymentRecord,
  Quote,
  ServicePackage,
  SmartEvent,
} from './types';

const TENANT_ID = 'polylolli-art-lik' as const;

export const OFFICIAL_PACKAGES: ServicePackage[] = [
  {
    id:'pkg-like', tenantId:TENANT_ID, slug:'like-party',
    name:{en:'Like Party',es:'Fiesta Like'}, tagline:{en:'Entertainment, games & balloons',es:'Animación, juegos y globos'},
    price:220, depositRequired:80, durationHours:2, maxChildren:15, ageRange:'3–8 years', colorTheme:'Pink / Violet', accentHex:'#ec4899',
    features:{en:['Bilingual entertainer','Interactive party games','Balloon twisting','Gift for every child + special celebrant gift'],es:['Animador bilingüe','Juegos interactivos','Globoflexia','Regalito para todos + regalo especial']},
    suitableFor:{en:'Home parties, halls and community spaces',es:'Fiestas en casa, salones y espacios comunitarios'}
  },
  {
    id:'pkg-art', tenantId:TENANT_ID, slug:'art-party',
    name:{en:'Art & Face Paint Party',es:'Fiesta Arte y Pintacaras'}, tagline:{en:'Face painting, games & balloons',es:'Pintacaras, juegos y globos'},
    price:290, depositRequired:100, durationHours:2.5, maxChildren:20, ageRange:'4–11 years', colorTheme:'Turquoise / Cyan', accentHex:'#06b6d4',
    features:{en:['Face painting artist','Games host','Balloon twisting','Cosmetic glitter & gems'],es:['Artista de pintacaras','Animador de juegos','Globoflexia','Purpurina cosmética y gemas']},
    suitableFor:{en:'Birthdays and family events',es:'Cumpleaños y eventos familiares'}
  },
  {
    id:'pkg-magic', tenantId:TENANT_ID, slug:'magic-party',
    name:{en:'Magic Party',es:'Fiesta Mágica'}, tagline:{en:'Magic, face paint, balloons & games',es:'Magia, pintacaras, globos y juegos'},
    price:350, depositRequired:150, durationHours:3, maxChildren:25, ageRange:'4–10 years', colorTheme:'Magenta / Gold', accentHex:'#d946ef',
    features:{en:['Interactive comedy magic show','Face painting','Balloon sculptures','Special celebrant gift + guest favours'],es:['Show de magia interactiva','Pintacaras','Globoflexia','Regalo especial + detalles para invitados']},
    suitableFor:{en:'Larger birthdays and milestone celebrations',es:'Cumpleaños grandes y celebraciones especiales'}
  },
  {
    id:'pkg-allfun', tenantId:TENANT_ID, slug:'all-fun-premium',
    name:{en:'All Fun Premium',es:'All Fun Premium'}, tagline:{en:'Inflatable play, entertainment & sweet station',es:'Hinchable, animación y estación dulce'},
    price:480, depositRequired:180, durationHours:3, maxChildren:30, ageRange:'2–10 years', colorTheme:'Electric Blue / Neon', accentHex:'#3b82f6',
    features:{en:['Two entertainers','Bouncy castle or soft play','Popcorn or cotton candy machine','Face painting & balloons'],es:['Dos animadores','Castillo hinchable o soft play','Palomitas o algodón de azúcar','Pintacaras y globos']},
    suitableFor:{en:'Full venue celebrations',es:'Celebraciones completas en salón'}
  },
  {
    id:'pkg-dreams', tenantId:TENANT_ID, slug:'dreams-party',
    name:{en:'Dreams Party',es:'Fiesta Dreams'}, tagline:{en:'Fully bespoke event production',es:'Producción de evento totalmente personalizada'},
    price:650, depositRequired:250, durationHours:4, maxChildren:40, ageRange:'Custom', colorTheme:'Gold / Pink', accentHex:'#f59e0b',
    features:{en:['Custom styling','Entertainment team','Premium balloon installation','Bespoke activities & catering add-ons'],es:['Decoración personalizada','Equipo de animación','Instalación premium de globos','Actividades y extras a medida']},
    suitableFor:{en:'Bespoke premium celebrations',es:'Celebraciones premium personalizadas'}
  }
];

type BookingBundle = { booking:Booking; customer:Customer; event:EventDetails; quote:Quote; changeRequests:ChangeRequest[] };

class KernivaClient {
  private bundles = new Map<string, BookingBundle>();
  private smartEvents: SmartEvent[] = [];
  private audit: AuditLogEntry[] = [];

  constructor() {
    const preferences: LowRiskPreferences = { estimatedChildren:18, allergies:'', accessibilityNotes:'', musicPreferences:'Pop & Disney', themePreferences:'Princess / Pastel Pink', venueParkingNotes:'Parking available behind hall', generalNotes:'Birthday cake at 17:15' };
    const customer: Customer = { id:'cus-demo', tenantId:TENANT_ID, name:'Elena Davies', email:'elena.davies@example.co.uk', phone:'+44 7700 900382', createdAt:new Date().toISOString() };
    const event: EventDetails = { id:'evt-demo', tenantId:TENANT_ID, bookingRef:'PLY-26-8K2F', celebrantName:'Sofia', celebrantAge:7, eventType:"Children's Birthday", eventDate:'2026-11-21', startTime:'15:00', endTime:'18:00', durationHours:3, venueName:'The Grove Hall', venueAddress:'High Street, Watford, WD17 3TX', packageId:'pkg-magic', packageName:'Magic Party', theme:'Princess / Pastel Pink', status:'QUOTE_SENT', preferences };
    const booking: Booking = { publicId:'PLY-26-8K2F', tenantId:TENANT_ID, customerId:customer.id, eventId:event.id, status:'QUOTE_SENT', createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), totalAmount:350, depositPaid:0, outstandingBalance:350 };
    const quote: Quote = { id:'quo-demo', tenantId:TENANT_ID, bookingRef:booking.publicId, packageId:'pkg-magic', packageName:'Magic Party', subtotal:350, travelFee:0, total:350, depositAmount:150, status:'SENT', termsVersion:'2026-10' };
    this.bundles.set(booking.publicId,{booking,customer,event,quote,changeRequests:[]});
  }

  async createEnquiry(data:any) {
    const pkg = OFFICIAL_PACKAGES.find(p=>p.id===data.packageId) || OFFICIAL_PACKAGES[0];
    const ref = 'PLY-26-' + Math.random().toString(36).slice(2,6).toUpperCase();
    const now = new Date().toISOString();
    const customer:Customer={id:'cus-'+Date.now(),tenantId:TENANT_ID,name:data.parentName,email:data.parentEmail,phone:data.parentPhone,createdAt:now};
    const preferences:LowRiskPreferences={estimatedChildren:data.estimatedChildren||10,allergies:data.notes||'',accessibilityNotes:'',musicPreferences:'',themePreferences:data.theme||'',venueParkingNotes:'',generalNotes:data.notes||''};
    const event:EventDetails={id:'evt-'+Date.now(),tenantId:TENANT_ID,bookingRef:ref,celebrantName:data.celebrantName,celebrantAge:data.celebrantAge,eventType:data.eventType,eventDate:data.eventDate,startTime:data.preferredTime,endTime:this.endTime(data.preferredTime,pkg.durationHours),durationHours:pkg.durationHours,venueName:data.venueName,venueAddress:data.venueAddress,packageId:pkg.id,packageName:pkg.name.en,theme:data.theme||'',status:'ENQUIRY_RECEIVED',preferences};
    const booking:Booking={publicId:ref,tenantId:TENANT_ID,customerId:customer.id,eventId:event.id,status:'ENQUIRY_RECEIVED',createdAt:now,updatedAt:now,totalAmount:pkg.price,depositPaid:0,outstandingBalance:pkg.price};
    const quote:Quote={id:'quo-'+Date.now(),tenantId:TENANT_ID,bookingRef:ref,packageId:pkg.id,packageName:pkg.name.en,subtotal:pkg.price,travelFee:0,total:pkg.price,depositAmount:pkg.depositRequired,status:'SENT',termsVersion:'2026-10'};
    this.bundles.set(ref,{booking,customer,event,quote,changeRequests:[]});
    this.emit('enquiry.created','New Party Enquiry',ref,'action_required');
    this.log('BOOKING',ref,'CREATED','Public Website','Enquiry safely persisted in Kerniva tenant context.');
    return {bookingRef:ref};
  }

  async getBooking(ref:string){ return this.bundles.get(ref) || null; }
  async getAllBookingsForTenant(){ return [...this.bundles.values()].map(x=>x.booking); }
  async getSmartEvents(){ return [...this.smartEvents]; }
  async getAuditLogs(){ return [...this.audit]; }

  async acceptQuote(quoteId:string, ref:string){
    const b=this.must(ref); b.quote.status='ACCEPTED'; b.quote.acceptedAt=new Date().toISOString(); b.booking.status='DEPOSIT_PENDING'; b.event.status='DEPOSIT_PENDING';
    this.emit('quote.accepted','Quote Accepted',ref,'success'); this.log('QUOTE',quoteId,'ACCEPTED','Customer Portal','Customer accepted current quote and terms.');
    return b.quote;
  }

  async processDepositPayment(ref:string, amount:number, method:string):Promise<PaymentRecord>{
    const b=this.must(ref); b.booking.depositPaid+=amount; b.booking.outstandingBalance=Math.max(0,b.booking.totalAmount-b.booking.depositPaid); b.booking.depositPaidAt=new Date().toISOString(); b.booking.status='CONFIRMED'; b.event.status='CONFIRMED';
    const payment:PaymentRecord={id:'pay-'+Date.now(),tenantId:TENANT_ID,bookingRef:ref,amount,type:'DEPOSIT',status:'SUCCEEDED',paidAt:new Date().toISOString(),providerReference:'sim-'+Date.now(),paymentMethod:method};
    this.emit('payment.completed','Deposit Paid',ref,'success'); this.log('PAYMENT',payment.id,'DEPOSIT_CONFIRMED','Payment Service',`£${amount} verified; booking confirmed.`);
    return payment;
  }

  async updatePreferences(ref:string, updates:Partial<LowRiskPreferences>){
    const b=this.must(ref); b.event.preferences={...b.event.preferences,...updates}; b.event.theme=updates.themePreferences || b.event.theme;
    this.emit('customer.preferences_updated','Event Preferences Updated',ref,'info'); this.log('PREFERENCES',ref,'LOW_RISK_UPDATE','Customer Portal','Customer updated non-commercial event preferences.');
    return {...b.event};
  }

  async submitChangeRequest(ref:string,data:{field:string;currentValue:string;requestedValue:string;reason:string}){
    const b=this.must(ref); const req:ChangeRequest={id:'cr-'+Date.now(),tenantId:TENANT_ID,bookingRef:ref,requestedAt:new Date().toISOString(),requestedBy:'CUSTOMER',field:data.field,currentValue:data.currentValue,requestedValue:data.requestedValue,reason:data.reason,status:'PENDING_REVIEW'};
    b.changeRequests.push(req); this.emit('booking.change_requested','Booking Change Requested',ref,'action_required'); this.log('CHANGE_REQUEST',req.id,'SUBMITTED','Customer Portal',`${data.field}: ${data.currentValue} → ${data.requestedValue}`);
    return req;
  }

  async reviewChangeRequest(id:string, approved:boolean, notes:string){
    for(const b of this.bundles.values()){
      const req=b.changeRequests.find(r=>r.id===id); if(!req) continue;
      req.status=approved?'APPROVED':'REJECTED'; req.reviewedAt=new Date().toISOString(); req.reviewedBy='Kerniva Business Ops'; req.reviewerNotes=notes;
      if(approved){ if(req.field==='startTime'){b.event.startTime=req.requestedValue;b.event.endTime=this.endTime(req.requestedValue,b.event.durationHours);} if(req.field==='eventDate')b.event.eventDate=req.requestedValue; if(req.field==='venueName')b.event.venueName=req.requestedValue; }
      this.emit('booking.change_resolved',approved?'Change Approved':'Change Rejected',b.booking.publicId,approved?'success':'info'); this.log('CHANGE_REQUEST',id,req.status,'Kerniva Business Ops',notes);
      return req;
    }
    throw new Error('Change request not found');
  }

  private must(ref:string){ const b=this.bundles.get(ref); if(!b) throw new Error(`Booking ${ref} not found`); return b; }
  private endTime(start:string,hours:number){ const [h,m]=start.split(':').map(Number); return `${String((h+hours)%24).padStart(2,'0')}:${String(m||0).padStart(2,'0')}`; }
  private emit(eventType:SmartEvent['eventType'],title:string,ref:string,severity:SmartEvent['severity']){ this.smartEvents.unshift({id:'se-'+Date.now()+Math.random(),tenantId:TENANT_ID,eventType,title,description:`Kerniva event for ${ref}`,payload:{bookingRef:ref},timestamp:new Date().toISOString(),severity}); }
  private log(entityType:AuditLogEntry['entityType'],entityId:string,action:string,performedBy:string,details:string){ this.audit.unshift({id:'aud-'+Date.now()+Math.random(),tenantId:TENANT_ID,entityType,entityId,action,performedBy,details,timestamp:new Date().toISOString()}); }
}

export const kernivaClient = new KernivaClient();
