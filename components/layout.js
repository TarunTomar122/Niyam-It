import Nav from './nav';

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <main className="mx-14">{children}</main>
        </div>
    )
}