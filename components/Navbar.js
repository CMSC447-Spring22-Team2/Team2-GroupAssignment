import Link from 'next/link'

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>Mark 2</h1>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href='/crimeDescription'><a>Crime Description</a></Link>
        </nav>
    );
}
 
export default Navbar;