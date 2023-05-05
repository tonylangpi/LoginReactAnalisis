import "../assets/scss/pagination.scss"
export default function Pagination({beneficiaryPerPage, allbeneficiary, pagination, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allbeneficiary/beneficiaryPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav >
            <ul className='paginationPrincipal'>
                { pageNumbers?.map(number => (
                        <li  key={number} onClick={()=> pagination(number)}>
                            {number}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};