document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Material selection handler
    const materialSelect = document.getElementById('material');
    const customAlphaContainer = document.getElementById('custom-alpha-container');
    
    materialSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customAlphaContainer.style.display = 'block';
        } else {
            customAlphaContainer.style.display = 'none';
        }
    });

    // Calculation functions
    function calculateLinearExpansion() {
        const alpha = getAlphaValue();
        const initialTemp = parseFloat(document.getElementById('initial-temp').value);
        const finalTemp = parseFloat(document.getElementById('final-temp').value);
        const initialLength = parseFloat(document.getElementById('initial-length').value);
        
        if (isNaN(alpha) {
            showError("Please enter a valid coefficient of thermal expansion");
            return;
        }
        
        if (isNaN(initialTemp) {
            showError("Please enter a valid initial temperature");
            return;
        }
        
        if (isNaN(finalTemp)) {
            showError("Please enter a valid final temperature");
            return;
        }
        
        if (isNaN(initialLength)) {
            showError("Please enter a valid initial length");
            return;
        }
        
        const deltaT = finalTemp - initialTemp;
        const deltaL = initialLength * alpha * deltaT;
        const finalLength = initialLength + deltaL;
        
        document.getElementById('formula-text').innerHTML = "ΔL = L₀ × α × ΔT";
        
        displayResult(`
            <p><strong>Change in Length (ΔL):</strong> ${deltaL.toExponential(4)} m (${(deltaL*1000).toFixed(4)} mm)</p>
            <p><strong>Final Length:</strong> ${finalLength.toFixed(6)} m</p>
            <p><strong>Temperature Change (ΔT):</strong> ${deltaT} °C</p>
            <p><strong>Coefficient (α):</strong> ${alpha.toExponential(6)} /°C</p>
        `);
    }
    
    function calculateAreaExpansion() {
        const alpha = getAlphaValue();
        const initialTemp = parseFloat(document.getElementById('initial-temp').value);
        const finalTemp = parseFloat(document.getElementById('final-temp').value);
        const initialLength = parseFloat(document.getElementById('initial-length').value);
        
        if (isNaN(alpha)) {
            showError("Please enter a valid coefficient of thermal expansion");
            return;
        }
        
        if (isNaN(initialTemp) || isNaN(finalTemp) || isNaN(initialLength)) {
            showError("Please enter valid values for all fields");
            return;
        }
        
        const deltaT = finalTemp - initialTemp;
        const initialArea = initialLength * initialLength; // Assuming square for simplicity
        const deltaA = initialArea * 2 * alpha * deltaT;
        const finalArea = initialArea + deltaA;
        
        document.getElementById('formula-text').innerHTML = "ΔA = A₀ × 2α × ΔT";
        
        displayResult(`
            <p><strong>Change in Area (ΔA):</strong> ${deltaA.toExponential(4)} m² (${(deltaA*1e6).toFixed(4)} mm²)</p>
            <p><strong>Final Area:</strong> ${finalArea.toFixed(6)} m²</p>
            <p><strong>Temperature Change (ΔT):</strong> ${deltaT} °C</p>
            <p><strong>Coefficient (α):</strong> ${alpha.toExponential(6)} /°C</p>
        `);
    }
    
    function calculateVolumeExpansion() {
        const alpha = getAlphaValue();
        const initialTemp = parseFloat(document.getElementById('initial-temp').value);
        const finalTemp = parseFloat(document.getElementById('final-temp').value);
        const initialLength = parseFloat(document.getElementById('initial-length').value);
        
        if (isNaN(alpha)) {
            showError("Please enter a valid coefficient of thermal expansion");
            return;
        }
        
        if (isNaN(initialTemp) || isNaN(finalTemp) || isNaN(initialLength)) {
            showError("Please enter valid values for all fields");
            return;
        }
        
        const deltaT = finalTemp - initialTemp;
        const initialVolume = initialLength * initialLength * initialLength; // Assuming cube for simplicity
        const deltaV = initialVolume * 3 * alpha * deltaT;
        const finalVolume = initialVolume + deltaV;
        
        document.getElementById('formula-text').innerHTML = "ΔV = V₀ × 3α × ΔT";
        
        displayResult(`
            <p><strong>Change in Volume (ΔV):</strong> ${deltaV.toExponential(4)} m³ (${(deltaV*1e9).toFixed(4)} mm³)</p>
            <p><strong>Final Volume:</strong> ${finalVolume.toFixed(6)} m³</p>
            <p><strong>Temperature Change (ΔT):</strong> ${deltaT} °C</p>
            <p><strong>Coefficient (α):</strong> ${alpha.toExponential(6)} /°C</p>
        `);
    }
    
    function getAlphaValue() {
        if (materialSelect.value === 'custom') {
            return parseFloat(document.getElementById('custom-alpha').value);
        }
        return parseFloat(materialSelect.value);
    }
    
    function displayResult(content) {
        document.getElementById('result').innerHTML = content;
    }
    
    function showError(message) {
        document.getElementById('result').innerHTML = `
            <p class="error">${message}</p>
        `;
    }

    // Event listeners for buttons
    document.getElementById('calculate-btn').addEventListener('click', calculateLinearExpansion);
    document.getElementById('calculate-area-btn').addEventListener('click', calculateAreaExpansion);
    document.getElementById('calculate-volume-btn').addEventListener('click', calculateVolumeExpansion);
});