export default async function PrivacyPage() {

    return (
        <div className="flex flex-col gap-4 lowercase text-white p-4 overflow-y-auto">
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            
            <section>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p>opacity.email is a free email relay service. We take your privacy seriously and aim to be transparent about how we handle your data.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">analytics</h2>
                <p>we may track aggregate analytics (cookieless) to improve our service. we do not track individual users or their activity.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Data Storage</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Email contents are temporarily stored for a maximum of 24 hours to facilitate delivery</li>
                    <li>We permanently store only basic email metadata: subject lines, sender addresses, and recipient addresses</li>
                    <li>All data is stored in US-based data centers through our provider, Turso</li>
                    <li>We do not maintain user accounts or collect personal information</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
                <p>We collect only the minimum information necessary to provide our email relay service:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Email addresses for routing purposes</li>
                    <li>Email metadata (subject, sender, recipient)</li>
                    <li>Timestamps of email transactions</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
                <p>We do not sell, trade, or otherwise transfer your information to third parties. The only data sharing that occurs is the necessary routing of emails through our relay service.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-2">Note</h2>
                <p>do not use this service for sensitive info like bank accounts, or deeply personal info. we don't want to see it, and you shouldn't send it here.</p>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                <p>If you have any questions about our privacy policy, stop using the service. this is provided as is, without any warranty.</p>
            </section>
        </div>
    );
}