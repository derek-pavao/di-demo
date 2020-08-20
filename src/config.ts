const defaults = {
  brand: "aurasvc",
  stage: "dev",
  service: "billing",

  // client/zuora...
  zuora_api_endpoint: "https://rest.apisandbox.zuora.com",
  zuora_api_timeout: "9000", // 9 seconds!

  // zuora product catalog settings
  zuora_rev_rec_rule: "Recognize Daily Over Time (Adjustments fixed)",

  platform_api_key_secret: (config) => `${config("service")}_api_key`,

  api_domain: "api.dev.aurasvc.io",

  offer_code_key_length: 8,
  subscription_prefix: "LOCAL",

  catalog_table: (config) => {
    const service = config("service");
    return `${service}_catalog`;
  },

  subscription_table: (config) => {
    const service = config("service");
    return `${service}_subscription`;
  },

  config_table: (config) => {
    const service = config("service");
    return `${service}_config`;
  },

  event_channel: "billing",

  update_queue: "https://sqs.us-east-1.amazonaws.com/539721379710/billing_update",
};

export default function config(key: string) {
  const upperKey = key.toLocaleUpperCase();
  let val = process.env[upperKey] || defaults[key];

  if (typeof val === "function") {
    return val(config);
  }

  return val;
}

export function makeConfigProviders() {
  return Object.keys(defaults).map((key) => {
    return {
      token: key,
      useFactory: () => config(key),
    };
  });
}
