export default async function TermsPage() {

    return (
        <div className="flex flex-col gap-4 lowercase text-white p-4 overflow-y-auto">
            <h1 className="text-2xl font-bold lowercase">Terms of Service</h1>
            
            <section>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p>opacity.email is a free email relay service. by using our service, you agree to these terms and conditions.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Usage Guidelines</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>You may create and use multiple email relays</li>
                    <li>Each relay address is unique to you, use it wherever you want</li>
                    <li>We reserve the right to disable any relay address at any time for any reason</li>
                    <li>The service is provided "as is" without any warranties</li>
                    <li>We are not responsible for lost or delayed emails</li>
                    <li>we are not responsible for delivery, spam, viruses, or any other issues related to the emails you receive</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Prohibited Uses</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Sending spam or unsolicited emails</li>
                    <li>Using the service for illegal activities</li>
                    <li>Attempting to bypass our systems or security measures</li>
                    <li>Sending malware, viruses, or harmful content</li>
                    <li>Using the service to harass or harm others</li>
                    <li>using the service if you've been explicitly told to stop</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Abuse</h2>
                <p>We monitor for abuse and may take the following actions:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Immediate deactivation of abusive relay addresses</li>
                    <li>Blocking of IP addresses associated with abuse</li>
                    <li>Reporting of illegal activities to relevant authorities</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Service Changes</h2>
                <p>we reserve the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Modify or discontinue the service at any time</li>
                    <li>Update these terms without notice</li>
                    <li>Limit service availability or features</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
                <p>this is a free service provided as-is. we make no guarantees about availability, reliability, or security. use at your own risk.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">entity</h2>
                <p>opacity.email is owned and operated by narro project organization, a registered entity in the united states.</p>
            </section>
        </div>
    );
}