from .models import CarMake, CarModel

def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars from Japan"},
        {"name": "Mercedes", "description": "Luxury cars from Germany"},
        {"name": "Audi", "description": "Premium German cars"},
        {"name": "Kia", "description": "Reliable Korean cars"},
        {"name": "Toyota", "description": "Dependable Japanese cars"},
    ]
    car_make_instances = []
    for make in car_make_data:
        car_make_instances.append(
            CarMake.objects.get_or_create(name=make["name"], defaults={"description": make["description"]})[0]
        )

    car_model_data = [
        {"name": "Pathfinder", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "Qashqai", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "XTRAIL", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "A-Class", "type": "Sedan", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "C-Class", "type": "Sedan", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "E-Class", "type": "Sedan", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "A4", "type": "Sedan", "year": 2023, "car_make": car_make_instances[2]},
        {"name": "A5", "type": "Coupe", "year": 2023, "car_make": car_make_instances[2]},
        {"name": "Stinger", "type": "Sedan", "year": 2023, "car_make": car_make_instances[3]},
        {"name": "Sportage", "type": "SUV", "year": 2023, "car_make": car_make_instances[3]},
        {"name": "Corolla", "type": "Sedan", "year": 2023, "car_make": car_make_instances[4]},
        {"name": "Yaris", "type": "Sedan", "year": 2023, "car_make": car_make_instances[4]},
    ]
    for model in car_model_data:
        CarModel.objects.get_or_create(
            name=model["name"], car_make=model["car_make"],
            defaults={"type": model["type"], "year": model["year"]}
        )
    print("Data populated")
