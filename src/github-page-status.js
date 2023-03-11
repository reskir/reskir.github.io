import React, { useEffect, useState } from 'react';

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    );
}

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
};

export const GHPageStatus = () => {
    const [data, setData] = useState();

    useEffect(() => {
        console.log('test');
        const fetchData = async () => {
            const response = await fetch(
                'https://api.github.com/repos/reskir/reskir.github.io/pages/builds/latest',
                {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer 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',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    console.log(data);

    if (data) {
        return (
            <>
                <h4>Latest build of this webpage</h4>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '18px',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <a href={data.pusher.html_url}>
                            <img
                                style={{ borderRadius: '50%' }}
                                src={data.pusher.avatar_url}
                                width="50"
                            />
                        </a>
                    </div>
                    <div>
                        <div>
                            Status: {data.status} ✅ by{' '}
                            <a href={data.pusher.html_url}>
                                {data.pusher.login}
                            </a>
                        </div>
                        <div>
                            Created at:{' '}
                            {new Date(data.created_at).toLocaleDateString(
                                'en-US',
                                options
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <div>Loading...</div>;
};
