import JSZip from 'jszip';

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('token') as HTMLInputElement;
    const button = document.getElementById('generate') as HTMLButtonElement;
    const result = document.getElementById('result') as HTMLDivElement;

    async function generateZipFile(token: string) {
        try {
            // Ler o arquivo zip existente
            const response = await fetch('./ticketPTB.zip');
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo base');
            }

            // Carregar o zip existente
            const baseZip = await JSZip.loadAsync(await response.arrayBuffer());

            // Criar conteúdo do .env
            const envContent = `BOT_TOKEN=${token}\nNODE_OPTIONS="--no-warnings --no-deprecation"`;

            // Adicionar .env ao zip existente
            baseZip.file('.env', envContent);

            // Gerar o zip final
            const content = await baseZip.generateAsync({ type: 'blob' });
            
            // Criar URL do blob
            const url = window.URL.createObjectURL(content);
            
            // Configurar link de download manual
            const downloadLink = document.getElementById('download') as HTMLAnchorElement;
            if (downloadLink) {
                downloadLink.href = url;
                downloadLink.download = 'ticketPTB.zip';
            }

            // Download automático
            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.download = 'ticketPTB.zip';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

        } catch (error) {
            console.error('Erro:', error);
            if (error instanceof Error) {
                alert(`Erro: ${error.message}`);
            } else {
                alert('Erro ao gerar o arquivo zip');
            }
            result.classList.remove('show');
        }
    }

    function handleClick() {
        if (input && input.value.trim() !== '') {
            result.classList.add('show');
            generateZipFile(input.value);
        } else {
            alert('Por favor, insira um token válido');
        }
    }

    if (button) {
        button.onclick = handleClick;
    }
});