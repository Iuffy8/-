import { eliteNumbers } from '../elite.js';
export default {
  name: 'امر المنشن الجماعي',
  command: ['منشن'],
  category: 'عام',
  description: 'إرسال منشن جماعي مع نوعين: خفي أو واضح',
  args: ['خ', 'ج'], 
  execution: async ({ sock, m, args }) => {
    const senderNumber = m.key.participant;
    if (!eliteNumbers.includes(senderNumber)) {
      return sock.sendMessage(m.key.remoteJid, { text: '🚫 هذا الأمر مخصص للنخبة فقط.' });
    }
    const type = args[0];
    if (type === 'خ') {
      const participants = await sock.groupMetadata(m.key.remoteJid).then(metadata => metadata.participants);
      const hiddenMention = `حقوقك`; 
      await sock.sendMessage(m.key.remoteJid, { 
        text: hiddenMention,
        mentions: participants.map(p => p.id) 
      });
    } else if (type === 'ج') {
      const participants = await sock.groupMetadata(m.key.remoteJid).then(metadata => metadata.participants);
      const mentionText = participants.map(p => `@${p.id.split('@')[0]}`).join('\n'); 
      await sock.sendMessage(m.key.remoteJid, {
        text: `*منشن جماعي!*\n${mentionText}`,
        mentions: participants.map(p => p.id) 
      });
    } else {
      const hiddenMention = args.join(' '); 
      const participants = await sock.groupMetadata(m.key.remoteJid).then(metadata => metadata.participants);
            await sock.sendMessage(m.key.remoteJid, { 
        text: hiddenMention,
        mentions: participants.map(p => p.id)
      });
    }
  }, hidden: false,
};
