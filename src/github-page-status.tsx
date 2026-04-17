import React from "react";
import ReactDOM from "react-dom/client";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
} as Intl.DateTimeFormatOptions;

export const GHPageStatus = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["git-status"],
        queryFn: async () => {
            const response = await fetch("/api/github-status.json");
            if (!response.ok) {
                throw new Error("Failed to fetch build status");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return null;
    }

    return (
        <>
            <h4>Latest build of this webpage</h4>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "18px",
                    alignItems: "center",
                }}
            >
                {data.pusher && (
                    <div>
                        <a href={data.pusher.html_url}>
                            <img
                                style={{ borderRadius: "50%" }}
                                src={data.pusher.avatar_url}
                                width="50"
                            />
                        </a>
                    </div>
                )}
                <div>
                    <div>
                        Status: {data.status} ✅
                        {data.pusher && (
                            <>
                                {" "}by{" "}
                                <a href={data.pusher.html_url}>
                                    {data.pusher.login}
                                </a>
                            </>
                        )}
                    </div>
                    <div>
                        Created at:{" "}
                        {new Date(data.created_at).toLocaleDateString(
                            "en-US",
                            options
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.querySelector("#github-status")!);
root.render(
    <QueryClientProvider client={queryClient}>
        <GHPageStatus />
    </QueryClientProvider>
);
