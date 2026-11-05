import { render, screen, fireEvent } from '@testing-library/react';
import FormularioConfiguracion from './FormularioConfiguracion';

describe('FormularioConfiguracion', () => {
  test('Debe renderizar los campos del formulario', () => {
    render(<FormularioConfiguracion onGuardar={() => {}} />);
    expect(screen.getByLabelText(/Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Límite/)).toBeInTheDocument();
  });

  test('Debe llamar a onGuardar con los datos al enviar', () => {
    const onGuardarMock = vi.fn();
    render(<FormularioConfiguracion onGuardar={onGuardarMock} />);
    
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Correo/), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Límite/), { target: { value: '80' } });
    fireEvent.click(screen.getByText('Guardar configuración'));

    expect(onGuardarMock).toHaveBeenCalledWith({
      nombre: 'Test',
      correo: 'test@example.com',
      limite: 80,
    });
  });

  test('No debe llamar a onGuardar si el límite es menor a 50', () => {
    const onGuardarMock = vi.fn();
    render(<FormularioConfiguracion onGuardar={onGuardarMock} />);
    
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Correo/), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Límite/), { target: { value: '45' } });
    fireEvent.click(screen.getByText('Guardar configuración'));

    expect(onGuardarMock).not.toHaveBeenCalled();
  });
});