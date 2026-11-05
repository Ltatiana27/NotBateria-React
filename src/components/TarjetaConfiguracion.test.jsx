import { render, screen, fireEvent } from '@testing-library/react';
import TarjetaConfiguracion from './TarjetaConfiguracion';

describe('TarjetaConfiguracion', () => {
  const configuracionMock = {
    id: 1,
    nombre: 'Lizeth Sanabria',
    correo: 'ltsl35965425@soy.sena.edu.co',
    limite: 85,
  };

  test('Debe renderizar el nombre de la configuración', () => {
    render(<TarjetaConfiguracion configuracion={configuracionMock} onEliminar={() => {}} />);
    expect(screen.getByText('Lizeth Sanabria')).toBeInTheDocument();
  });

  test('Debe renderizar el correo y el límite', () => {
    render(<TarjetaConfiguracion configuracion={configuracionMock} onEliminar={() => {}} />);
    expect(screen.getByText(/ltsl35965425@soy.sena.edu.co/)).toBeInTheDocument();
    expect(screen.getByText(/85%/)).toBeInTheDocument();
  });

  test('Debe llamar a onEliminar con el ID al hacer clic en Eliminar', () => {
    const onEliminarMock = vi.fn();
    render(<TarjetaConfiguracion configuracion={configuracionMock} onEliminar={onEliminarMock} />);
    fireEvent.click(screen.getByText('Eliminar'));
    expect(onEliminarMock).toHaveBeenCalledWith(1);
  });
});