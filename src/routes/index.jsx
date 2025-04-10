import LayOutDefault from "../layout/LayOutDefault";
import KeyWordPage from "../pages/KeywordPage";
import SummaryText from "../pages/SummaryText";
import TopicPage from "../pages/TopicPage";
import Error404 from "../pages/Error404";

export const routes = [
    {
        path: "/",
        element: <LayOutDefault />,
        children: [
            {
                path: "/",
                element: <SummaryText />,
            },
            {
                path: "/keyword",
                element: <KeyWordPage />,
            },
            {
                path: "/topic",
                element: <TopicPage />,
            },
            {
                path: "*",
                element: <Error404 />,
            },
        ],
    },
];
