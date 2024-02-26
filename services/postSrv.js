import { Drl } from "../models/postchema.js";

async function getDrlSrv() {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return Drl.find().sort({ brandAvto: 1 });
}

async function addDrlSrv(data) {
  const resAddDb = await Drl.create(data);
  console.log(resAddDb);
  return resAddDb;
}

export { getDrlSrv, addDrlSrv };
