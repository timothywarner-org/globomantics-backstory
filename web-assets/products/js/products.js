/*
 * Globomantics Robotics - Product Catalog JavaScript
 * Created by Tim Warner (TechTrainerTim.com), Principal Author at Pluralsight
 * These materials are part of Pluralsight training content - No warranty provided
 */

// Product filtering and sorting functionality
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    const products = document.querySelectorAll('.product-item');
    let visibleProducts = [];
    
    // Apply category and price filters
    products.forEach(product => {
        const category = product.dataset.category;
        const price = parseInt(product.dataset.price);
        
        let showProduct = true;
        
        // Category filter
        if (categoryFilter !== 'all' && category !== categoryFilter) {
            showProduct = false;
        }
        
        // Price filter
        if (priceFilter !== 'all' && showProduct) {
            const [min, max] = priceFilter.includes('+') 
                ? [parseInt(priceFilter), Infinity] 
                : priceFilter.split('-').map(p => parseInt(p));
            
            if (price < min || price > max) {
                showProduct = false;
            }
        }
        
        if (showProduct) {
            product.classList.remove('hidden');
            visibleProducts.push(product);
        } else {
            product.classList.add('hidden');
        }
    });
    
    // Apply sorting
    sortProducts(visibleProducts, sortFilter);
}

function sortProducts(products, sortType) {
    const grid = document.getElementById('productsGrid');
    const sortedProducts = [...products];
    
    switch(sortType) {
        case 'name':
            sortedProducts.sort((a, b) => {
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                return nameA.localeCompare(nameB);
            });
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                return priceA - priceB;
            });
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                return priceB - priceA;
            });
            break;
        // 'featured' is default order, no sorting needed
    }
    
    // Reorder DOM elements
    sortedProducts.forEach(product => {
        grid.appendChild(product);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to filter dropdowns for real-time filtering
    const filterInputs = document.querySelectorAll('select');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    // Add click handlers to product buttons
    const productButtons = document.querySelectorAll('.product-item button');
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-item').querySelector('h3').textContent;
            const action = this.textContent;
            
            // Simulate different actions based on button text
            switch(action) {
                case 'Add to Cart':
                    showNotification(`${productName} added to cart!`, 'success');
                    break;
                case 'Request Quote':
                    showModal('quoteModal', productName);
                    break;
                case 'Contact Sales':
                    showModal('salesModal', productName);
                    break;
                case 'Learn More':
                    console.log(`Navigate to ${productName} details page`);
                    break;
                case 'Request Demo':
                    showModal('demoModal', productName);
                    break;
                case 'Buy Now':
                    console.log(`Proceed to checkout for ${productName}`);
                    break;
            }
        });
    });
    
    // Smooth scroll animation for products
    observeProducts();
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--success-green)' : 'var(--globo-blue)'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show modal (placeholder)
function showModal(modalType, productName) {
    const modalContent = {
        quoteModal: {
            title: 'Request a Quote',
            content: `Please fill out the form below to receive a quote for ${productName}.`
        },
        salesModal: {
            title: 'Contact Sales',
            content: `Our sales team will contact you about ${productName} within 24 hours.`
        },
        demoModal: {
            title: 'Request a Demo',
            content: `Schedule a personalized demo of ${productName} with our experts.`
        }
    };
    
    const modal = modalContent[modalType];
    if (modal) {
        alert(`${modal.title}\n\n${modal.content}\n\nEmail: sales@globomantics.com\nPhone: 1-800-GLOBO-AI`);
    }
}

// Intersection Observer for fade-in animation
function observeProducts() {
    const products = document.querySelectorAll('.product-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    products.forEach(product => observer.observe(product));
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);