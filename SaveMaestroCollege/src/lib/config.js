export const config = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  maintainerEmail: import.meta.env.VITE_MAINTAINER_EMAIL || 'record@your-domain.example',
};
export const isConfigured = [config.publicKey, config.serviceId, config.templateId]
  .every((v) => v && !String(v).startsWith('YOUR_'));
