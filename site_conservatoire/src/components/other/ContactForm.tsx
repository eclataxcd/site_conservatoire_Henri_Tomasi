import { useState } from "react";

export function ContactForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedOption, setSelectedOption] =
        useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            selectedOption,
            message
        );
        // Add your form submission logic here
    };

    const handleReset = () => {
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setEmail("");
        setSelectedOption("");
        setMessage("");
    };

    return (
        <form className="bg-blue-100">
            <label>Je souhaite contacter</label> <br />
            <select name="select" id="select" value={selectedOption}
                onChange={(e) =>
                    setSelectedOption(
                        e.target.value
                    )
                }
            >
                <option value="1">Conservatoire Bastia</option>
                <option value="2">Conservatoire Ajaccio</option>
            </select>
            <br /> <br />
            <label htmlFor="firstname">Prénom</label>
            <input required type="text" name="firstname" id="firstname" value={firstName} placeholder="Entrez votre prénom"
                onChange={(e) =>
                    setFirstName(e.target.value)
                }

            />
            <label htmlFor="lastname">Nom de famille</label>
            <input required type="text" name="lastname" id="lastname" value={lastName} placeholder="Entrez votre nom de famille"
                onChange={(e) =>
                    setLastName(e.target.value)
                }
            />
            <br />
            <label htmlFor="email">Contact</label>
            <input required type="email" name="email" id="email" value={email} placeholder="Entrez votre email"
                onChange={(e) =>
                    setEmail(e.target.value)
                }

            />


            <label htmlFor="message">Message</label>
            <textarea required name="message" id="message" placeholder="Ecrivez votre message ici"
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                
            ></textarea>
            <br />
            <button type="reset" value="reset" onClick={() => handleReset()}>
                Reset
            </button>

            <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>
                Submit
            </button>
        </form>
    );
}
