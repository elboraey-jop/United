export interface DeliveryArea {
  id: string;
  name: string;
  type: "city" | "village";
  fee: number;
}

export const SAMANOUD_AREAS: DeliveryArea[] = [
  // مدينة سمنود (توصيل 20 جنيه)
  { id: "samanoud-city", name: "مدينة سمنود", type: "city", fee: 20 },

  // قرى مركز سمنود المجاورة (توصيل 30 جنيه)
  { id: "meet-assaas", name: "قرية ميت عساس", type: "village", fee: 30 },
  { id: "mahalla-khalaf", name: "قرية محلة خلف", type: "village", fee: 30 },
  { id: "bahbeet-hegara", name: "قرية بهبيت الحجارة", type: "village", fee: 30 },
  { id: "al-rahebeen", name: "قرية الراهبين", type: "village", fee: 30 },
  { id: "banna-abu-seer", name: "قرية بنا أبو صير", type: "village", fee: 30 },
  { id: "abu-seer", name: "قرية أبو صير", type: "village", fee: 30 },
  { id: "kafr-hassan", name: "قرية كفر حسان", type: "village", fee: 30 },
  { id: "kafr-sarem", name: "قرية كفر الصارم", type: "village", fee: 30 },
  { id: "tlaima", name: "قرية طليمة", type: "village", fee: 30 },
  { id: "meet-habeeb", name: "قرية ميت حبيب", type: "village", fee: 30 },
  { id: "meet-badr-halawa", name: "قرية ميت بدر حلاوة", type: "village", fee: 30 },
  { id: "al-azizia", name: "قرية العزيزية", type: "village", fee: 30 },
  { id: "kafr-soabaneya", name: "قرية كفر الثعبانية", type: "village", fee: 30 },
  { id: "manshyat-badawi", name: "قرية منشأة البدوي", type: "village", fee: 30 },
];
