const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Contact", contactSchema);

// const fs = require("node:fs/promises");
// const path = require("node:path");
// const crypto = require("node:crypto");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(data);
// };

// async function writeContacts(contacts) {
//   return await fs.writeFile(
//     contactsPath,
//     JSON.stringify(contacts, undefined, 2)
//   );
// }

// const getContactById = async (contactId) => {
//   if (!contactId) {
//     return null;
//   }
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);

//   return contact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const removeContact = contacts.splice(index, 1)[0];
//   await writeContacts(contacts);
//   return removeContact;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = { id: crypto.randomUUID(), name, email, phone };
//   contacts.push(newContact);

//   await writeContacts(contacts);

//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { contactId, ...body };
//   await writeContacts(contacts);
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
