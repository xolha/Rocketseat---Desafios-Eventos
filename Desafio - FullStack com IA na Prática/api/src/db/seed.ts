
import {webhooks} from '@/db/schema/webhooks';
import {faker} from '@faker-js/faker';
import {uuidv7} from "uuidv7";
import {db} from "@/db/index";

async function seed() {
    const events = [
        'invoice.payment_succeeded',
        'invoice.payment_failed',
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'checkout.session.completed',
        'checkout.session.async_payment_failed',
        'charge.refunded',
        'payment_intent.canceled',
        'invoice.finalized',
    ];

    const webhookData = Array.from({length: 60}).map(() => ({
        id: uuidv7(), // Generate a unique ID
        method: faker.internet.httpMethod(), // Random HTTP method
        pathname: faker.internet.url(), // Random URL for pathname
        ip: faker.internet.ipv4(), // Random IPv4 address
        statusCode: faker.string.numeric({ length: 3 }), // Random pseudo status code
        contentType: faker.helpers.arrayElement(['application/json', 'text/html', 'text/plain']), // Random content type
        headers: {
            'authorization': `Bearer ${faker.string.alphanumeric(32)}`, // Simulated header
            'content-length': faker.string.numeric({ length: 3 }),
        },
        body: JSON.stringify({
            id: uuidv7(),
            object: faker.helpers.arrayElement(['event', 'payment_intent', 'invoice']),
            billing_reason: faker.helpers.arrayElement(['subscription_create', 'manual', 'subscription_cycle', null]),
            amount_paid: faker.number.float({ min: 10, max: 1000 }),
            currency: 'usd',
            status: faker.helpers.arrayElement(['paid', 'failed', 'unpaid']),
            created: faker.date.recent().toISOString(),
            customer: uuidv7(),
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await db.insert(webhooks).values(webhookData);

    console.log('Seed complete: 60 webhook records inserted.');
}

seed().catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});