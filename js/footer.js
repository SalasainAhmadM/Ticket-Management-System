function showCancelAlert() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to recover this import!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'Keep importing'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Cancelled!',
                'Your import has been cancelled.',
            'success'
        )
    }
    })
}

function showSuccessAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'Employee data has been imported successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'Great!'
    })
}